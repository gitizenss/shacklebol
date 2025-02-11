use bytes::Bytes;
use futures::{Stream, TryStreamExt, stream::MapOk};
use harpc_net::session::{error::TransactionError, server::SessionId};
use harpc_wire_protocol::response::kind::ResponseKind;

use crate::{
    body::{Body, Frame, boxed::BoxBody, controlled::Controlled, full::Full, stream::StreamBody},
    extensions::Extensions,
};

#[derive(Debug, Clone)]
pub struct Parts {
    pub session: SessionId,

    pub extensions: Extensions,
}

impl Parts {
    #[must_use]
    pub fn new(session: SessionId) -> Self {
        Self {
            session,
            extensions: Extensions::new(),
        }
    }
}

#[derive(Debug, Clone)]
pub struct Response<B> {
    head: Parts,
    body: B,
}

impl<B> Response<B>
where
    B: Body<Control: AsRef<ResponseKind>>,
{
    pub const fn from_parts(parts: Parts, body: B) -> Self {
        Self { head: parts, body }
    }

    pub const fn session(&self) -> SessionId {
        self.head.session
    }

    pub const fn body(&self) -> &B {
        &self.body
    }

    pub fn body_mut(&mut self) -> &mut B {
        &mut self.body
    }

    pub fn into_body(self) -> B {
        self.body
    }

    pub const fn extensions(&self) -> &Extensions {
        &self.head.extensions
    }

    pub fn extensions_mut(&mut self) -> &mut Extensions {
        &mut self.head.extensions
    }

    pub fn map_body<B2>(self, func: impl FnOnce(B) -> B2) -> Response<B2> {
        Response {
            head: self.head,
            body: func(self.body),
        }
    }
}

impl Response<Controlled<ResponseKind, Full<Bytes>>> {
    pub fn from_error(parts: Parts, error: TransactionError) -> Self {
        Self {
            head: parts,
            body: Controlled::new(ResponseKind::Err(error.code), Full::new(error.bytes)),
        }
    }
}

impl<S, E> Response<Controlled<ResponseKind, StreamBody<MapOk<S, fn(Bytes) -> Frame<Bytes, !>>>>>
where
    S: Stream<Item = Result<Bytes, E>>,
{
    pub fn from_ok(parts: Parts, stream: S) -> Self {
        Self {
            head: parts,
            body: Controlled::new(
                ResponseKind::Ok,
                StreamBody::new(stream.map_ok(Frame::new_data)),
            ),
        }
    }
}

pub type BoxedResponse<E> = Response<BoxBody<Bytes, ResponseKind, E>>;
