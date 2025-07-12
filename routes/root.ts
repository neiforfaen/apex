import { createRouter } from '../lib/router'

const root = createRouter('/')

root.get('/', (c) => c.text('@neiforfaen/apex | Root', 200))
root.get('/health', (c) => c.json({ status: 'OK' }, 200))

export default root
