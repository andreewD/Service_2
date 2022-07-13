import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const prenotification = Type.Object({
    id:Type.String(),
    email:Type.String({ format: 'email' }),
    time:Type.Number(),
    message:Type.String()
})

type Prenotification = Static<typeof prenotification>

const storedPrenotification = Type.Object({
    id:Type.String(),
    email:Type.String({ format: 'email' }),
    time:Type.Number(),
    message:Type.Array(Type.String()),
    timestamp:Type.Integer()
})

type StoredPrenotification = Static<typeof storedPrenotification>



const storePrenotification = Type.Object({args:prenotification})


export {Prenotification,storePrenotification,StoredPrenotification}