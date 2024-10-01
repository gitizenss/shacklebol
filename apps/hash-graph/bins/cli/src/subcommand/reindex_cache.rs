use authorization::NoAuthorization;
use clap::Parser;
use error_stack::{Report, Result, ResultExt, ensure};
use graph::store::{
    DataTypeStore, DatabaseConnectionInfo, DatabasePoolConfig, PostgresStorePool, StorePool,
};
use tokio_postgres::NoTls;

use crate::error::GraphError;

#[derive(Debug, Parser)]
#[clap(version, author, about, long_about = None)]
pub struct ReindexCacheArgs {
    #[clap(flatten)]
    pub db_info: DatabaseConnectionInfo,

    #[clap(flatten)]
    pub pool_config: DatabasePoolConfig,

    #[clap(flatten)]
    pub operations: ReindexOperations,
}

#[derive(Debug, Parser)]
#[clap(version, author, about, long_about = None, next_help_heading = Some("Reindex operations"))]
pub struct ReindexOperations {
    /// Reindex data types cache
    #[clap(long)]
    pub data_types: bool,
}

pub async fn reindex_cache(args: ReindexCacheArgs) -> Result<(), GraphError> {
    let pool = PostgresStorePool::new(&args.db_info, &args.pool_config, NoTls)
        .await
        .change_context(GraphError)
        .map_err(|report| {
            tracing::error!(error = ?report, "Failed to connect to database");
            report
        })?;

    let mut store = pool
        .acquire(NoAuthorization, None)
        .await
        .change_context(GraphError)
        .map_err(|report| {
            tracing::error!(error = ?report, "Failed to acquire database connection");
            report
        })?;

    let mut did_something = false;

    if args.operations.data_types {
        did_something = true;
        DataTypeStore::reindex_cache(&mut store)
            .await
            .change_context(GraphError)
            .map_err(|report| {
                tracing::error!(error = ?report, "Failed to reindex data type cache");
                report
            })?;
    }

    ensure!(
        did_something,
        Report::new(GraphError).attach_printable(
            "No reindex operation was requested. See --help for more information."
        )
    );

    Ok(())
}