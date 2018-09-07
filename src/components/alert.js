import dialog from './dialog';
import React from 'react';

export default function alert(text) {
    dialog(
        <container
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
            }}
        >
            <label text={text}/>
        </container>,
        {
            size: {
                width: 200,
                height: 140,
            },
        }
    )
}