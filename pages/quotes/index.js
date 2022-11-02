import Link from "next/link";
import useSWR from "swr";
import Layout from "../../components/Layout";
import Delete from "./[quote]/delete";
import Likes from "./[quote]/likes";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Home() {
  const { data, error } = useSWR("/api/quotes", fetcher);

  if (error)
    return (
      <Layout>
        <div>failed to load</div>
      </Layout>
    );
  if (!data)
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );

  console.log(data);
  return (
    <Layout
      title="Inspiring Quotes"
      action={
        <Link href={"/quotes/new"}>
          <a className="btn btn-primary">Add new Quote</a>
        </Link>
      }
    >
      {data  && data?.map((q, i) => (
          <div key={i} className="card mb-3">
            <div className="card-body d-flex justify-content-between">
              <div className="card-text badge bg-primary h-100">{i + 1}</div>
              <div className="text-center d-flex flex-column justify-content-center">
                <h5 className="card-title">{q.quote}</h5>
                <p className="card-text">{q.person}</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="">{q.likes}</div>
                <hr />
                <Likes quote={q._id} />
                <hr />
                <Delete quote={q._id} />
              </div>
            </div>
          </div>
        ))}
      {data?.length == 0 && <p>Add a quote to the page!</p>}
    </Layout>
  );
}
