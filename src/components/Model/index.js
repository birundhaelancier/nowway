import React from "react";
import { Modal } from 'antd';
import "./model.scss";


function DynModel(props) {
    const [visible, setVisible] = React.useState(false);

    function handleCancel() {
        setVisible(false)
        props.handleClose(false)
    }

    React.useEffect(() => {
        setVisible(props.show)
    }, [props.show])

    return (
        <Modal
            className={` ${props.modalchanges}`}
            title={props.modelTitle}
            centered={props.centered ? true : true}
            visible={visible}
            footer={null}
            width={props.width ? props.width : 520}
            zIndex={1201}
            onCancel={handleCancel}
            closable={true}
            maskClosable={false}
        >
            {props.children}
        </Modal>
    )
}

export default DynModel;

// import { OmitProps } from "antd/lib/transfer/ListBody";
// import React from "react";
// import "./model.css";

// const Modal = ({ handleClose, show, children, width }) => {
//     const showHideClassName = show ? "modal d-block" : "modal d-none";

//     return (
//         <div className={showHideClassName}>
//             <div className="modal-container" style={{ width: width && width + "%" }}>
//                 <div className="hederModel">
//                     <button className="closebtn" onClick={handleClose}>
//                         <i class="fas fa-times"></i>
//                     </button></div>
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default Modal;
