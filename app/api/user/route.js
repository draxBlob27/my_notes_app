import { getUser } from "@/actions/userActions"

export const GET = async(req) => {
    try {
        const { searchParams } = new URL(req.url)
        const email = searchParams.get("email")

        if (!email)
            return Response.json({error: "Email is required"}, {status : 400});

        const user = await getUser(email);
        return Response.json(user);
    } catch (error) {
        console.error(error.message);
        return Response.json({error: error.message}, {status : 400})
    } 
}
