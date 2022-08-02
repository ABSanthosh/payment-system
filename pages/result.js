import useSWR from "swr";
import { useRouter } from "next/router";
import { fetchGetJSON } from "../Utils/api-helpers";

export default function Result() {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;
  return <pre>{JSON.stringify(data)}</pre>;
}
