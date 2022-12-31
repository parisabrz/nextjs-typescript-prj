import { NextApiRequest, NextApiResponse } from 'next'

export default function getVehiclesById(req: NextApiRequest,res: NextApiResponse){
    res.json({byId: req.query.id, message: 'getVehiclesById'})
}