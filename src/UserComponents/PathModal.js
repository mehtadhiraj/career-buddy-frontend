import React from "react";

function PathModal(props){
    return(
        <div className="modal fade" id={"modal"+props.index} tabIndex="-1" role='dialog' aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {
                        props.path.map((p, idx)=>{
                            return(
                                <div key={idx}>
                                    <div className="card bg-light mb-3" style="max-width: 18rem;">
                                        <div className="card-header">{p.courses.split(",").length} Steps</div>
                                        <div className="card-body">
                                            <h5 className="card-title">{p.courses}</h5>
                                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default PathModal;