import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import DropDownPopover from "./DropDownPopOver";
import Portal from "./Portal";
import { cloneDeep } from "lodash"

const Wrapper = styled.div`
    display: flex;
    background: #e8e6f0;
    padding: 40px;
    height: 100%;
    flex-direction: column;
    flex-direction: column;
    align-items: flex-start;
`;

const Container = styled.div`
background: white;
display: flex;
flex-direction: column;
height: 60%;
width: 70%;
padding: 40px;
`;

const InputContainer = styled.div`
width: 70%;
position: relative;
`;

const PermissionDropdown = styled.div`
position: relative;
margin-top: 16px;
width: 100%;
border: 1px solid grey;
border-radius: 4px 4px 0px 0px;
padding: 8px;
display: flex;
align-items: center;
justify-content: space-between;
`;

const Input = styled.input`
height: 60px;
width: 100%;
background: #d1d5de;
border-radius: 4px;
`;

const Button = styled.div`
height: 65px;
width: 30%;
background: #0f3ca3;
display: flex;
align-items: center;
justify-content: center;
color: white;
border-radius: 4px;
`;

const DropDownContainer = styled.span`
position: absolute;
top: 37%;
right: 5%;
`;

const ModifierSection = styled.div`
display: flex;
`;

const Avatar = styled.div`
    border-radius: 50%;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background: #ab9ce6;
    color: #4808bf;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
font-size: 20px;
font-weight: 500;
margin-bottom: 8px;
`

const Description = styled(Title)`
font-size: 14px;
color: grey;
`;

const UserDetailsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: baseline;
margin-left: 8px;
`;

const btnRef = React.createRef();
const titleRef = React.createRef();

const SearchAndAdd = (props) => {
    const [access, setAccess] = useState('');
    const [isOn, setOn] = useState(false);
    const [coords, setCoords] = useState({});
    const [userData, setUserData] = useState(props.users)

    const updateTooltipCoords = (button) => {
    const rect = button.getBoundingClientRect();

    const renderPopOver = () => (
        <Portal>
          <DropDownPopover
            coords={coords}
            updateTooltipCoords={() =>
              updateTooltipCoords(btnRef.current.buttonNode)
            }
          >
          </DropDownPopover>
        </Portal>
      );
    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + 300,
    });
  };

  const setAccessForUser = (option, connectedUser) => {
      const usersClone = cloneDeep(userData);
      const unMatchedusers = usersClone.filter(user => user.email !== connectedUser.email);
      const temp = [
        ...unMatchedusers,
        {
            ...connectedUser,
            role: option
        }
    ];
      setUserData([
          ...unMatchedusers,
          {
              ...connectedUser,
              role: option
          }
      ]);
  }

  const deleteUser = selectedUser => {
    const filteredUsers = userData.filter(user => user.name !== selectedUser.name);
    setUserData(filteredUsers)
  }

  const renderOptionsNode = () => {
      const { users } = props
      return userData.map(user =>{
          const avatar = user.name.split(' ')
          return (
              <PermissionDropdown>
                  <div className="firstSection">
                <Avatar>{`${avatar[0][0]}${avatar[1][0]}`}</Avatar>
                <UserDetailsContainer>
                    <Title ref={titleRef}>{user.name}</Title>
                    <div className="aboutSeparator">
                    <Description>{user.designation}</Description>
                    <Description>{user.email}</Description>
                    </div>
                </UserDetailsContainer>
                </div>
                <DropDownContainer
                        ref={btnRef}
                        onClick={(e) => {
                            updateTooltipCoords(e.target);
                            return setOn(!isOn);
                        }}
                    >{user.role} <FontAwesomeIcon icon={faChevronDown} />
                    </DropDownContainer>
                    <div className="trashIcon" onClick={() => deleteUser(user)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </div>
                    { isOn && (
                        <Portal>
                        <DropDownPopover
                          noderef={btnRef.current}  
                          onOptionSelection={((option) => { console.log("this",titleRef); return setAccessForUser(option, user)})}
                          coords={coords}
                          updateTooltipCoords={() =>
                            updateTooltipCoords(btnRef.current.buttonNode)
                          }
                        >
                        </DropDownPopover>
                      </Portal>
                    ) }
              </PermissionDropdown>
          );
      })
  }
    return (
        <Wrapper>
            <Container>
            <ModifierSection>
                <InputContainer>
                    <Input placeholder="Add name or email"/>
                    <DropDownContainer
                        ref={btnRef}
                        onClick={(e) => {
                            updateTooltipCoords(e.target);
                            return setOn(!isOn);
                        }}
                    >{access === '' ? 'View Access' : access} <FontAwesomeIcon icon={faChevronDown} />
                    </DropDownContainer>
                    { isOn && (
                        <Portal>
                        <DropDownPopover
                          noderef={btnRef.current}  
                          onOptionSelection={((option, myRef) => { debugger; return setAccess(option)})}
                          coords={coords}
                          updateTooltipCoords={() =>
                            updateTooltipCoords(btnRef.current.buttonNode)
                          }
                        >
                        </DropDownPopover>
                      </Portal>
                    ) }
                </InputContainer>
                <Button>Add People</Button>
                </ModifierSection>
                    {renderOptionsNode()}
            </Container>
        </Wrapper>
    )
}

export default SearchAndAdd;