export const formatDate = (dateCreated) => {
  "use client"
    const DDMMYYYY =  dateCreated.split("T")[0].split("-").reverse().join("/");
    return  DDMMYYYY;
  };