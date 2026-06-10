export type ButtonProps = {
  title: string;
  className?: string;
};
export default function Button(props: ButtonProps) {
  return (
    <>
      <button
        className={`
        flex items-center
        leading-none
        ${props.className ?? ""}
      `}
      >
        {props.title}
      </button>
    </>
  );
}
