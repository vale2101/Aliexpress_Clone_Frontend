import Button from "../atoms/Button";

interface Props {
  onClick: () => void;
}

const CancelButton: React.FC<Props> = ({ onClick }) => (
  <Button
    type="button"
    onClick={onClick}
    className="bg-gray-300 text-gray-800 hover:bg-gray-400"
  >
    Cancelar
  </Button>
);

export default CancelButton;