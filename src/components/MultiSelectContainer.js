import React, { useState } from 'react';
import styled from 'styled-components';
import MultiSelect from './MultiSelect';
import {isEmpty} from 'lodash';

const Wrapper = styled.div`
    display: flex;
    background: #e8e6f0;
    padding: 40px;
    height: 100%;
    flex-direction: column;
    flex-direction: column;
    align-items: flex-start;
`

const Container = styled.div`
background: white;
display: flex;
flex-direction: column;
height: 60%;
width: 70%;
padding: 40px;
`

const Header = styled.div`
display: flex;
margin-bottom: 16px;
justify-content: space-between;
@media only screen and (max-width: 600px){
    display: flex;
    flex-direction: column;
}
`;

const Title = styled.div`
font-size: 20px;
font-weight: 500;
margin-bottom: 8px;
`;

const Description = styled(Title)`
font-size: 14px;
color: grey;
cursor: pointer;
`;

const SuggestionContainer = styled.div`
display: flex;
align-items: baseline;
margin-top: 12px;
flex-wrap: wrap;
max-width: 40%;
min-width: 100%;
`

const Pills = styled.div`
border: 1px solid #4808bf;
color: #4808bf;
padding: 8px;
margin-left: 8px;
cursor: pointer;
border-radius: 4px;
`

const PillContainer = styled.div`
display: flex;
flex-wrap: wrap;
min-height: 100%;
align-content: space-around;
`;

export default function MultiSelectContainer(props) {
    const [selectedOption, setSelectedOption] = useState({ });
    const [isResetInitiated, setIsResetInitiated] = useState(false);

    const addItem = (suggestedOption) => {
        const prevOption = isEmpty(selectedOption) ? [] : selectedOption;
        const option = [...prevOption, {value: suggestedOption, label: suggestedOption}].filter(option => option !== null)
        setSelectedOption(option);
    }

    const resetSelection = () => {
        setIsResetInitiated(true)
    }

    const onUnSetReset = () => {
        setIsResetInitiated(false);
        setSelectedOption({});
    }

    const renderSuggestions = () => (props.suggestions.map(suggestion => <Pills value={suggestion}onClick={() => addItem(suggestion)}>{`${ suggestion } +`}</Pills>))

    return (
        <Wrapper>
            <Container>
                <Header>
                    <Title>School/College/University</Title>
                    <Description onClick={resetSelection}>Reset</Description>
                </Header>
                <MultiSelect defaultValue={selectedOption} isReset={isResetInitiated} onUnSetReset={onUnSetReset}/>
                <SuggestionContainer>
                    <Description>Suggestions</Description>
                    <PillContainer>
                    { renderSuggestions() }
                    </PillContainer>
                </SuggestionContainer>
            </Container>
        </Wrapper>
    )
}
