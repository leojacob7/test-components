import React, { useEffect } from "react";
import debounce from "lodash/debounce";
import styled from 'styled-components';


const DropDown = styled.div`
border: 1px solid;
border-radius: 4px;
`;

const OptionContainer = styled.div`
display: flex;
cursor: pointer;
flex-direction: column;
background: white;
padding: 8px;
&:hover {
    background: #d1d5de;
}
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

const DropDownPopOver = ({ children, coords, updateTooltipCoords, onOptionSelection, noderef }) => {
  const updateCoords = debounce(updateTooltipCoords, 100);

  useEffect(() => {
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  const renderOptions = () => {
      const options = [
        {
            name: "Admin Role",
            description: "Gives full access to the job and the candidates"
        },
        {
            name: "Edit Access",
            description: "Gives access to edit the job and view the candidates"
        },
        {
            name: "View Access",
            description: "Gives access to only view the job and add comments"
        }
    ];

    return options.map(option => (
        <OptionContainer onClick={() => onOptionSelection(option.name, noderef)}>
            <Title>{option.name}</Title>
            <Description>{option.description}</Description>
        </OptionContainer>
    ))
  }

  return (
    <div
      style={{ ...styles.popover, ...coords }}
      className="ant-popover ant-popover-placement-top"
    >
      <div className="ant-popover-content">
        <div className="ant-popover-arrow" />
        <div className="ant-popover-inner" role="tooltip">
          <DropDown>
            { renderOptions() }
          </DropDown>
        </div>
      </div>
    </div>
  );
};

const styles = {
  popover: {
    position: "absolute",
    width: 200,
    transform: "translate(-100px, -100%)"
  }
};

export default DropDownPopOver;
