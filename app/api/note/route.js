import { editNote, getNote } from "@/actions/userActions"
import { createNote } from "@/actions/userActions"
export const GET = async(req) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")

        if (!userId)
            return Response.json({error: "UserId is required"}, {status : 100});

        const notes = await getNote(userId);
        return Response.json(notes);
    } catch (error) {
        console.error(error.message);
        return Response.json({error: error.message}, {status : 300})
    } 
}

export const POST = async(req) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")

        const body = await req.json();
        

        if (!userId)
            return Response.json({error: "UserId is required"}, {status : 250});

        await createNote(userId, body);
        return Response.json({message : "Successfully added new note"});
    } catch (error) {
        console.error(error.message);
        return Response.json({error: error.message}, {status : 400})
    }
}

export const PUT = async(req) => {
    try {
        const {searchParams} = new URL(req.url)
        const noteId = searchParams.get("noteId")

        const body = await req.json();
        if (!noteId)
            return Response.json({error: "Note id not given"}, {status: 300});

        await editNote(noteId, body);
        return Response.json({message : "Successfully edited note"})
    } catch (error) {
        console.error(error.message);
        return Response.json({error: error.message}, {status : 200})
    }
}