import type { NextApiRequest, NextApiResponse } from 'next'
import { Dato } from "/lib/dato/api"

const DATO_TIMEOUT = 8000;

const getPathsFromPayload = async (payload : any, record : any) => {
  const paths = []
  const { apiKey } = record.model;
  
  // Generate paths here

  return paths;
}

export default async (req : NextApiRequest, res : NextApiResponse) => {

  if(!basicAuth(req)) return res.status(401).send('Access denied')
  
  try{
    
    const payload = req.body?.entity;
    const record = await getRecordFromPayload(payload)
    if(!payload) throw 'Payload is empty'

    const paths = await getPathsFromPayload(payload, record)
    
    if(!paths.length) 
      throw new Error(`Nothing to revalidate`);
    
    const t = new Date().getTime()
    const to = setTimeout(()=>res.json({ revalidated: true, paths, duration:DATO_TIMEOUT, timeout:true}), DATO_TIMEOUT)
    const result = await Promise.all(paths.map(path => res.unstable_revalidate(path)))
    clearTimeout(to)
    const duration = (new Date().getTime()-t)
    if(duration > DATO_TIMEOUT)  return
    res.json({ revalidated: true, paths, duration })
  } catch(err){
    console.log(err)
    res.status(500).send(`Error revalidating: ${err.message || err }`)
  }
}

const getRecordFromPayload = async (payload : any) => {
  
  const modelId = payload?.relationships?.item_type?.data?.id
  
  if(!modelId) throw 'Model id not found in payload!'

  const models = await Dato.itemTypes.all();
  const model = models.filter(m => m.id === modelId)[0]
  const record = (await Dato.items.all({filter: {type: model.apiKey, fields:{id: {eq:payload.id }}}},{allPages: true}))[0]
  if(!record) 
    throw `No record found with modelId: ${modelId}`
  return {...record, model}
}

const basicAuth = (req : NextApiRequest) => {
  const basicAuth = req.headers.authorization
  if (!basicAuth) return true;

  const auth = basicAuth.split(' ')[1]
  const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')
  return user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASSWORD
} 