import CC from "@/components/cc";

export default function Params({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>Dynamic Route and Query Params</h1>
      <p>Params (Slug): {params.slug}</p>

      <hr />

      <p>CC Component:</p>
      <CC />

      <hr />

      <p>QueryString:</p>
      <p>SearchParams: {JSON.stringify(searchParams)}</p>
      <p>Guitar: {searchParams.guitar}</p>
    </div>
  );
}
