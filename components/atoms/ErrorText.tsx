interface ErrorTextProps {
  message: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => (
  <p className="text-red-600 text-sm mb-2">{message}</p>
);

export default ErrorText;