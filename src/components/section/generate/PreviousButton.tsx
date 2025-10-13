import styled from 'styled-components';

interface PreviousButtonProps {
    onClick?: () => void;
}

const StyledButton = styled.button`
    display: block;
    margin: 25px auto 0 auto;

    color: var(--sub-text, #6B7280);
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: 0.845px; /* 정확한 px 단위로 수정 */
    text-underline-offset: 2.47px;
    text-underline-position: from-font;

    background: none;
    border: none;
    cursor: pointer;
`;

export default function PreviousButton({ onClick }: PreviousButtonProps) {
    return <StyledButton onClick={onClick}>＜ 이전 단계로</StyledButton>;
}
