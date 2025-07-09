type CellBadgeProps = {
  text: React.ReactNode;
  backgroundColor: string;
};
export function CellBadge({ text, backgroundColor }: CellBadgeProps) {
  return (
    <div
      style={{
        fontSize: "10px",
        backgroundColor,
        color: "#FFFFFF",
        paddingLeft: "3px",
        paddingRight: "3px",
        borderRadius: "2px",
        marginLeft: "9px",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      {text}
    </div>
  );
}
