import React, {useState } from 'react';
import styled from 'styled-components';
import Icon from './locked-user-pngrepo-com.png';
import RadioOptions from './RadioOptions'

const Wrapper = styled.div`
    display: flex;
    background: #e8e6f0;
    padding: 40px;
    height: 100%;
    flex-direction: column;
    flex-direction: column;
    align-items: flex-start;
`

const AvatarWrapper = styled.div`
display: inline;
max-width: 10px;
`

const Title = styled.div`
font-size: 20px;
font-weight: 500;
margin-bottom: 8px;
`

const TitleContent = styled(Title)`
display: flex;
flex-direction: row;
justify-content: end;
width: 100%;
align-items: baseline;
`

const Image = styled.img`
max-width: 100%;
max-height: 100%;
display: block;
margin-left: 8px;
`;

const Description = styled(Title)`
font-size: 14px;
color: grey;
`;

const Reset = styled(Description)`
cursor: pointer;
`;

const ExperienceContainerTitle = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`

const ExperienceContainer = styled.div`
display: flex;
border-radius: 4px;
background: white;
width: 95%;
padding: 24px;
flex-direction: column;
`

const TabContainer = styled.div`
display: flex;
width: 100%;
`


const LeftTab = styled.div`
border: 1px solid;
border-radius: 4px 0 0 4px;
width: 50%;
padding: 16px;
margin-bottom: 8px;
cursor: pointer;
background-color: ${props => props.activeTab ? '#ab9ce6' : "white"};
`

const RightTab = styled(LeftTab)`
border: 1px solid;
border-radius: 0 4px 4px 0;
width: 50%;
`

function Experience(props) {
    const [activeTab, setActiveTab] = useState('individualContributor')
    const [selectedOption, setSelectedOption] = useState('')
    const { positions: { individualContributor, peopleLead } } = props;

    const renderOptions = (tab) => {
        const options  = activeTab === 'individualContributor' ? individualContributor?.options : peopleLead?.options;
        return options.map((option, index) =>
           <RadioOptions dataKey={index} type={activeTab} option={option} onSelection={option => setSelectedOption(option)} selectedOption={selectedOption}/>
        )
    }

    const resetTabs = () => {
        setActiveTab('individualContributor');
        setSelectedOption('')
    }

    const renderSelectionResult = () => <div>{`Your selections for the role type: ${positions[activeTab].name} is ${selectedOption}`}</div>;

    const { positions } = props;
    return (
        <div>
            <Wrapper>
                <TitleContent>
                    EXPERIENCE PREFERENCES 
                    <AvatarWrapper><Image alt='leo' src={Icon} /></AvatarWrapper>
                </TitleContent>
                <Description>Select preferences you are looking for in a candidate</Description>
                <ExperienceContainer >
                    <ExperienceContainerTitle>
                        <Title>Previous job positions/levels held</Title>
                        <Reset onClick={resetTabs}> Reset</Reset>
                    </ExperienceContainerTitle>
                    <TabContainer>
                        <LeftTab
                            activeTab={activeTab === 'individualContributor'}
                            onClick={() => { setActiveTab('individualContributor'); renderOptions() }}
                        >
                            { positions.individualContributor.name }
                        </LeftTab>

                        <RightTab
                            activeTab={activeTab === 'peopleLead'}
                            onClick={() => setActiveTab('peopleLead')}
                        >
                            { positions.peopleLead.name }
                        </RightTab>
                    </TabContainer>
                        { renderOptions() }

                        { selectedOption !== '' && renderSelectionResult() }
                </ExperienceContainer>
            </Wrapper>
        </div>
    );
}

Experience.defaultProps = {
    positions: {
        individualContributor: {
            name: 'Individual Contributor',
            options: [
                'Analyst',
                'Senior Analyst',
                'Principal',
                'CXO/Founder Level',
            ]
        },
        peopleLead: {
            name: 'People Lead',
            options: [
                'Tech Lead',
                'Manager',
                'Senior Manager',
                'Vice President',
            ]
        }
    }     
  };

export default Experience;