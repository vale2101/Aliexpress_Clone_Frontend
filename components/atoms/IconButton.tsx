import Button from "../atoms/Button";

export default function IconButton({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <Button variant="secondary">
      <Icon className="w-5 h-5" />
    </Button>
  );
}
