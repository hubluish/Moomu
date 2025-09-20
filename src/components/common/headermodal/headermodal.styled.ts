// headermodal.styled.ts
import styled from 'styled-components';

    export const Wrapper = styled.div`
    display: flex;
    width: 354px;
    padding: 28px 24px;
    align-items: flex-start;
    align-content: flex-start;
    gap: 16px 103px;
    flex-wrap: wrap;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.25);
    `;

    export const TopRow = styled.div`
    display: flex;
    width: 298px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    `;

    export const UserLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    `;

    export const UserName = styled.div`
    color: #000;
    font-family: Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans,
        Apple SD Gothic Neo, 'Malgun Gothic', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    `;

    export const MenuList = styled.div`
    display: flex;
    width: 306px;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    `;

    export const MenuItem = styled.div`
    display: flex;
    width: 306px;
    padding: 12px 0 12px 8px;
    align-items: center;
    gap: 8px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background: var(--toast-alarm, #ebebff);
    }

    &.logout {
        color: var(--text_red, #f73a32);
    }
    `;

    export const MenuLabel = styled.span`
    color: #000;
    font-family: Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans,
        Apple SD Gothic Neo, 'Malgun Gothic', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &.logout {
        color: var(--text_red, #f73a32);
    }
    `;
