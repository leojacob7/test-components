import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    padding: 24px 0px;
    height: 100%;
    flex-direction: column;
    flex-direction: column;
    align-items: flex-start;
`

const RadioWrapper = styled.div`
border: 1px solid grey;
border-radius: 4px;
width: 100%;
padding: 16px 0px 16px 0px;
display: flex;
cursor: pointer;
&:focus {
    border: 1px solid #532bf0;
  }
`

const RadioLabel = styled.input`
flex: 0.03;
`

export default function RadioOptions({dataKey, option, type, onSelection, selectedOption}) {
    const onClick = () => onSelection(option);
    return (
        <Wrapper onClick={onClick} key={dataKey}>
            <RadioWrapper>
                <RadioLabel
                    type="radio"
                    id={dataKey}
                    name={type}
                    value={option} 
                    checked={option===selectedOption}
                    />
                <label>{option}</label>
            </RadioWrapper>
        </Wrapper>
    )
}
