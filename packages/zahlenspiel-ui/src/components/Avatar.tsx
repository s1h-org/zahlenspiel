import styled from "styled-components";
import React from "react";

export interface AvatarProps {
    identifier: string;
    size?: number;
}

interface AvatarImageProps {
    size?: number;
}

const AvatarImage = styled.img`
    width: ${(props: AvatarImageProps) => props.size || "128"};
    height: ${(props: AvatarImageProps) => props.size || "128px"};
    border-radius: 50%;
`;

export const Avatar = (props: AvatarProps) => {
    const today = new Date();
    const dateRandomizer = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
    const imgSrc = `https://api.adorable.io/avatars/${props.size}/${props.identifier}_${dateRandomizer}`;
    return <AvatarImage src={imgSrc} size={props.size}/>
};