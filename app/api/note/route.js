import { deleteNote, editNote, getNote } from "@/actions/userActions"
import { createNote } from "@/actions/userActions"
export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")

        if (!userId)
            return Response.json({ error: "UserId is required" }, { status: 400 });

        const notes = await getNote(userId);
        return Response.json(notes);
    } catch (error) {
        console.error(error.message);
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export const POST = async (req) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")

        const body = await req.json();


        if (!userId)
            return Response.json({ error: "UserId is required" }, { status: 300 });

        const note = await createNote(userId, body);
        // console.log(note._id.toString())
        return Response.json({ message: note._id.toString()}, {status: 200});
    } catch (error) {
        console.error(error.message);
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export const PUT = async (req) => {
    try {
        const { searchParams } = new URL(req.url)
        const noteId = searchParams.get("noteId")

        const body = await req.json();
        if (!noteId)
            return Response.json({ error: "Note id not given" }, { status: 400 });

        await editNote(noteId, body);
        return Response.json({ message: "Successfully edited note" }, {status: 200})
    } catch (error) {
        console.error(error.message);
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export const DELETE = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const noteId = searchParams.get("noteId");
        
        if (!noteId) {
            return Response.json({error : "Note not found"}, {status : 500});
        }

        await deleteNote(noteId);
        return Response.json({message: "Deleted note"}, {status : 200});
    } catch (error) {
        console.error(error.message);
        return Response.json({ message: error.message }, { status: 400 });
    }
}