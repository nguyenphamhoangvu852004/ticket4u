export default async function GetList() {
  const url = "https://dummyjson.com/products";
  try {
    const rs = await fetch(url, {
      method: "GET",
    });
    return rs.json();
  } catch (error) {
    console.error(error);
  }
}
