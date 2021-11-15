type EmojiProps = {
  label?: string;
  symbol: string;
};

export default function Emoji(props: EmojiProps) {
  return (
    <>
      <span
        role="img"
        aria-label={props?.label ?? ''}
        aria-hidden={!!props?.label}>
        {props.symbol}
      </span>
    </>
  );
}
