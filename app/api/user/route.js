import { deleteAll, getUser } from "@/actions/userActions"

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

export const DELETE = async(req) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")

        if (!userId)
            return Response.json({error: "User is required"}, {status : 400});

        await deleteAll(userId);
        return Response.json({"message": "Deleted all notes"}, {status: 200});
    } catch (error) {
        console.error(error.message);
        return Response.json({error: error.message}, {status : 400})
    } 
}
