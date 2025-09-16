import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { listContent, filterByTag } from "@/slices/contentSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ResourceHub = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s)=>s.content);
  const [tag, setTag] = useState("");

  useEffect(()=> {
    dispatch(listContent()).unwrap().catch(()=>{});
  },[dispatch]);

  const applyFilter = async () => {
    try{
      await dispatch(filterByTag({ tag })).unwrap();
      toast.success("Filtered content");
    }catch(e:any){ toast.error("Filter failed"); }
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex justify-between mb-4">
        <input value={tag} onChange={(e:any)=>setTag(e.target.value)} placeholder="Filter by tag" className="input"/>
        <Button onClick={applyFilter}>Filter</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <div>Loading...</div>}
        {items && items.length ? items.map((it:any)=>(
          <Card key={it.id} className="p-4">
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm">{it.description}</p>
            <div className="mt-2"><Badge>{(it.tags||[]).join(", ")}</Badge></div>
            <div className="mt-2"><a href={it.mediaUrl} target="_blank" rel="noreferrer"><Button>Open</Button></a></div>
          </Card>
        )) : <div>No resources</div>}
      </div>
    </section>
  );
};
