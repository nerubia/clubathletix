'use client'

import { useState } from "react";
import { Dialog, DialogActions, DialogBody, DialogTitle } from "./dialog";
import { Button } from "./button";

export default function DialogButton({
    dialog,
    ...props
}: {
    dialog: {
        title: string;
        action: string;
        body: React.ReactElement;
    }
    children?: React.ReactElement
}) {
    const [open, toggle] = useState(false)
    const onClose = () => {}
    return <>
        <span className="inline" role="button" onClick={() => toggle(!open)}>{props.children}</span>
        <Dialog open={open} onClose={onClose} size="2xl" data-theme="light">
            <DialogTitle data-theme="light">{dialog.title}</DialogTitle>
            
            <div className="my-8">{dialog.body}</div>

            <DialogActions>
                <Button color='light' type="button" onClick={() => toggle(false)}>Close</Button>
                <Button color="rose" type="button" className="mr-0" onClick={() => toggle(!open)}>{dialog.action}</Button>
            </DialogActions>
        </Dialog>
    </>
}