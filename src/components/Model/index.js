// import React from "react";
// import { Modal } from 'antd';
// import "./model.css";


// function DynModel(props) {
//     const [visible, setVisible] = React.useState(false);

//     function handleCancel() {
//         setVisible(false)
//         props.handleChangeCloseModel(false)
//     }

//     React.useEffect(() => {
//         setVisible(props.handleChangeModel)
//     }, [props.handleChangeModel])

//     return (
//         <Modal
//             className={`modelContainer ${props.modalchanges}`}
//             // title={props.modelTitle}
//             centered={props.centered ? true : false}
//             visible={visible}
//             footer={null}
//             width={props.width ? props.width : 520}
//             zIndex={1201}
//             onCancel={handleCancel}
//             closable={false}
//             maskClosable={false}
//         >
//             {"props.content"}
//         </Modal>
//     )
// }

// export default DynModel;

import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";
import "./model.css";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-container">
                <div className="hederModel">
                    <button className="closebtn" onClick={handleClose}>
                        <i class="fas fa-times"></i>
                    </button></div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
