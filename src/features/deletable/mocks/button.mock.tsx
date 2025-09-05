import { vi } from "vitest";

interface ButtonMockProps {
  text: string;
  isDisabled?: boolean;
}

const onButtonClickMock = vi.fn();

const ButtonMock: React.FC<ButtonMockProps> = ({ text, isDisabled }) => {
  return (
    <button onClick={onButtonClickMock} disabled={isDisabled}>
      {text}
    </button>
  );
};

export { onButtonClickMock, ButtonMock };
