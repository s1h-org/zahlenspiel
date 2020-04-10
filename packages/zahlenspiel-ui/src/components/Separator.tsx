import styled from "styled-components";

export interface SeparatorProps {
    size: number;
    color: string;
}

export const Separator = styled.hr`
    color: ${(props: SeparatorProps) => props.color};
    backgroundColor: ${(props: SeparatorProps) => props.color};
    height: ${(props: SeparatorProps) => props.size}px;
`;
