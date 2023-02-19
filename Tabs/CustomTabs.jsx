import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./CustomTabs.css";

const CustomTabs = ({ children = [], defaultActiveKey, callback }) => {
  const [key, setKey] = useState(defaultActiveKey);

  return (
    <div className="custom_tabs">
      <Tabs
        defaultActiveKey={defaultActiveKey}
        id=""
        className=""
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          callback && callback(k);
        }}
      >
        {children.map(({ title, tab }, index) => {
          return (
            <Tab key={index} eventKey={title} title={title} o>
              {tab}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default CustomTabs;
