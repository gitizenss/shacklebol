import { useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

import {
  GetAccountPagesQuery,
  GetAccountPagesQueryVariables,
  GetAccountsQuery,
} from "../graphql/autoGeneratedTypes";
import {
  getAccountPages,
  getAccounts,
} from "../graphql/queries/account.queries";

import styles from "./index.module.scss";
import { createApolloClient } from "../graphql/createApolloClient";

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createApolloClient();

  const result = await client.query<GetAccountsQuery>({
    query: getAccounts,
  });

  if (result) {
    const { accounts } = result.data;

    const firstPage = await accounts.reduce(
      (promise, account) =>
        promise.then(async (page) => {
          if (!page) {
            const result = await client.query<
              GetAccountPagesQuery,
              GetAccountPagesQueryVariables
            >({
              query: getAccountPages,
              variables: {
                accountId: account.accountId,
              },
            });

            const pages = result.data.accountPages;
            if (pages.length > 0) {
              return `${account.accountId}/${pages[0].metadataId}`;
            }
          }

          return page;
        }),
      Promise.resolve<null | string>(null)
    );

    if (firstPage) {
      return {
        redirect: {
          destination: firstPage,
          permanent: false,
        },
      };
    }
  }

  return { props: {} };
};

export default function Home() {
  const { data } = useQuery<GetAccountsQuery>(getAccounts);

  return (
    <main className={styles.Main}>
      <header>
        <h1>HASH.dev</h1>
      </header>

      <section>
        <h2>Accounts in this instance</h2>
        <ul>
          {data?.accounts.map((account) => (
            <li key={account.id}>
              <Link href={`/account/${account.id}`}>
                <a>{account.properties.shortname}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Block playground</h2>
        <p>
          <Link href="/playground">
            <a>Click here to visit the block playground</a>
          </Link>
        </p>
      </section>
    </main>
  );
}
