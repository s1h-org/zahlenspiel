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
    const imgSrc = `https://robohash.org/${props.identifier}_${dateRandomizer}.png?size=${props.size}x${props.size}&ignoreext=false`;
    return <AvatarImage src={imgSrc} size={props.size}/>
};
