import {useEffect, useState} from "react";
import type {sortBy, sortKey} from "../types/sort.ts";
import type {filter} from "../types/filter.ts";

type TodoFiltersProps = {
    onSearch: (searchKey: string) => void;
    onSort: (sortBy: sortBy, sortKey: sortKey) => void;
    onFilter: (filter: filter) => void;
}

export default function TodoFilters({onSearch, onSort, onFilter}: TodoFiltersProps) {
    const [searchKey, setSearchKey] = useState<string>("");
    const [sortBy, setSortBy] = useState<sortBy>('createdAt');
    const [sortKey, setSortKey] = useState<sortKey>('asc');
    const [filter, setFilter] = useState<filter>({priority: '', status: ''});


    useEffect(() => {
        const delay = setTimeout(() => {
            onSearch(searchKey);
        }, 200);

        return () => clearTimeout(delay);
    }, [searchKey]);

    useEffect(() => {
        const delay = setTimeout(() => {
            onSort(sortBy, sortKey);
        }, 200);

        return () => clearTimeout(delay);
    }, [sortKey, sortBy]);

    useEffect(() => {
        const delay = setTimeout(() => {
            onFilter(filter);
        }, 200);

        return () => clearTimeout(delay);
    }, [filter]);

    return (
        <div className="max-w-md mt-15 p-4 rounded-xl bg-white shadow-md h-128 flex flex-col justify-start">
            {/* Search */}
            <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search..."
                className="p-2 border rounded"
            />

            {/* Sort */}
            <div className="flex justify-start items-center gap-2 mt-4">
                <p className="text-sm text-gray-500">Sort By</p>
                <select
                    className="border rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as sortBy)}>
                    <option value="createdAt">Created At</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2 mt-4">
                <p className="text-sm text-gray-500">Sort Key</p>
                <select
                    className="border rounded"
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as sortKey)}>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                </select>
            </div>

            {/* Filter */}
            <div className="flex justify-start items-center gap-2 mt-4">
                <p className="text-sm text-gray-500">Priority</p>
                <select
                    className="border rounded"
                    value={filter.priority}
                    onChange={(e) =>
                        setFilter((prev) => ({ ...prev, priority: e.target.value as filter["priority"] }))
                    }
                >
                    <option value="">All</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2 mt-4">
                <p className="text-sm text-gray-500">Status</p>
                <select
                    className="border rounded"
                    value={filter.status}
                    onChange={(e) =>
                        setFilter((prev) => ({ ...prev, status: e.target.value as filter["status"] }))
                    }
                >
                    <option value="">All</option>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
            </div>
        </div>
    );
}