import { useState, useEffect } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import MemberForm from "../components/MemberForm";
import MemberTable from "../components/MemberTable";
import axios from "axios";

function MemberList() {
    const [members, setMembers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [editingMember, setEditingMember] = useState(null);

    const API = 'http://localhost:5000/api/members';

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(API);
            setMembers(res.data);
            setFiltered(res.data);
        } catch (err) {
            console.error("Fetch error", err);
        }
    };

    const addMember = async (member) => {
        try {
            if (editingMember) {
                // Update existing member
                const res = await axios.put(`${API}/${editingMember._id}`, member);
                const updated = members.map((m) =>
                    m._id === editingMember._id ? res.data : m
                );
                setMembers(updated);
                setFiltered(updated);
                setEditingMember(null);
            } else {
                // Create new member
                const res = await axios.post(API, member);
                const updated = [...members, res.data];
                setMembers(updated);
                setFiltered(updated);
            }
        } catch (err) {
            console.error("Add/Update error", err);
        }
    };

    const deleteMember = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            const updated = members.filter((m) => m._id !== id);
            setMembers(updated);
            setFiltered(updated);
        } catch (err) {
            console.error("Delete error", err);
        }
    };

    const editMember = (id) => {
        const m = members.find((mem) => mem._id === id);
        if (m) {
            setEditingMember(m);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const searchMembers = (term) => {
        const t = term.toLowerCase();
        setFiltered(
            members.filter(
                (m) =>
                    m.name.toLowerCase().includes(t) ||
                    m.email.toLowerCase().includes(t)
            )
        );
    };

    const today = new Date();
    const activeCount = members.filter(
        (m) => new Date(m.membershipDate) >= today
    ).length;
    const expiredCount = members.length - activeCount;

    return (
        <div className="p-6 max-w-screen-xl mx-auto bg-gray-100">
            <Header />
            <div className="flex flex-wrap gap-4 justify-between mb-10">
                <StatCard title="Total Members" count={members.length} />
                <StatCard title="Active Members" count={activeCount} />
                <StatCard title="Expired Memberships" count={expiredCount} />
            </div>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2">
                    <h2 className="text-2xl text-indigo-700 mb-4 font-semibold">
                        {editingMember ? "Edit Member" : "Add New Member"}
                    </h2>
                    <MemberForm onAdd={addMember} editingMember={editingMember} />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-2xl text-indigo-700 mb-4 font-semibold">Members List</h2>
                    <MemberTable
                        members={filtered}
                        onDelete={deleteMember}
                        onEdit={editMember}
                        onSearch={searchMembers}
                    />
                </div>
            </div>
        </div>
    );
}

export default MemberList;
