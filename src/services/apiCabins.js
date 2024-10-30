import supabase, { supabaseUrl } from "./supabase";

// GET
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be loaded");
  }
  return data;
}

// Create / Edit
// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   // https://llvkobvznbnbffuajrla.supabase.co/storage/v1/object/public/cabin-image/cabin-001.jpg

//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;

//   // Create / edit cabin
//   let query = supabase.from("cabins");

//   // A. Add new Cabin
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B. Edit a cabin
//   if (id)
//     query = query
//       .update({ ...newCabin, image: imagePath })
//       .eq("id", id)
//       .select();

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins Could not be created");
//   }

//   // 2. Add Image
//   if (hasImagePath) return;

//   const { storgeError } = await supabase.storage
//     .from("cabin-image")
//     .upload(imageName, newCabin.image);

//   // 3. Delete Cabin if there was an error uploading the image
//   if (storgeError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storgeError);
//     throw new Error("Cabins image can not be uploaded");
//   }

//   return data;
// }

export async function createEditCabin(newCabin, id) {
  // Check if newCabin and newCabin.image are valid
  if (!newCabin) {
    throw new Error("Cabin data is required");
  }

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Generate image name only if newCabin.image is a File
  let imageName = "";
  if (newCabin.image && !hasImagePath) {
    if (typeof newCabin.image.name !== "string") {
      throw new Error("Invalid image file provided");
    }
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  }

  // Set image path based on whether the image is new or existing
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;

  // Create / edit cabin
  let query = supabase.from("cabins");

  if (!id) {
    // Add new cabin
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    // Edit existing cabin
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or edited");
  }

  // If no new image needs to be uploaded, return the data
  if (hasImagePath) return data;

  // Upload new image
  const { error: storageError } = await supabase.storage
    .from("cabin-image")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // Delete the cabin record if the image upload fails
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

// Delete
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be deleted");
  }
  return data;
}
