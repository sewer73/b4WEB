import type { VercelRequest, VercelResponse } from '@vercel/node';

const {
  ODOO_URL, ODOO_DB, ODOO_USER, ODOO_API,
} = process.env;
const headers = { 'Content-Type': 'application/json' };

async function odooRpc(payload: object) {
  const res = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: 'POST',
    headers,
    body:   JSON.stringify(payload),
  });
  const { result, error } = await res.json();
  if (error) throw new Error(JSON.stringify(error));
  return result;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const limit  = parseInt(String(req.query.limit  ?? 8), 10);
  const offset = parseInt(String(req.query.offset ?? 0), 10);

  /* 1· Login => cookie de sesión */
  await odooRpc({
    jsonrpc: '2.0',
    method:  'call',
    params:  { service: 'common', method: 'login', args: [ODOO_DB, ODOO_USER, ODOO_API] },
    id: 1,
  });

  /* 2· search_read */
  const items = await odooRpc({
    jsonrpc: '2.0',
    method:  'call',
    params:  {
      service: 'object', method: 'execute_kw',
      args: [
        ODOO_DB, false, ODOO_API,
        'product.template', 'search_read',
        [ [] ],
        {
          fields: [
            'id', 'name', 'list_price', 'compare_list_price',
            'x_studio_catalogofoto2',
          ],
          limit, offset,
        },
      ],
    },
    id: 2,
  });

  /* 3· Mapear al formato de la UI */
  const mapped = items.map((p: any) => ({
    id:            p.id,
    title:         p.name,
    price:         p.list_price,
    originalPrice: p.compare_list_price ?? null,
    imgUrl:        p.x_studio_catalogofoto2 || '',
  }));

  res.setHeader('Access-Control-Allow-Origin', '*');   // CORS libre
  res.json({
    nextOffset: mapped.length < limit ? null : offset + mapped.length,
    items:      mapped,
  });
}
