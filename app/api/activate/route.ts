import axios from 'axios';

export async function POST(request) {
	const { activationToken} = await request.json();
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/activate`, {
			activationToken
		});
		if (response.status === 201) {
			return new Response(JSON.stringify({ success: true }), { status: 201 });
		} else {
			return new Response(JSON.stringify({ success: false, errors: response.data.errors }), { status: response.status });
		}
	} catch (error:any) {
		return new Response(JSON.stringify({
			success: false,
			errors: error.response?.data?.errors || [{ general: 'Server error' }],
		}), { status: error.response?.status || 500 });
	}
}