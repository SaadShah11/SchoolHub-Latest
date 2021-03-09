import React from "react";
import {CircularProgress} from "@material-ui/core";

export default function Loading(props) {

    return (
        <div>
            <text>Page is loading, Please wait</text>
            <CircularProgress size={40} />
        </div>
    )

}