import * as S from "./styles";

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <S.Container>
      <S.Spinner />
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}
