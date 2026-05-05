'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/admin-auth';
import { useRouter } from 'next/navigation';
import { AdminProtected } from '@/components/admin-protected';
import { Trash2, ArrowLeft, Loader2 } from 'lucide-react';

function QueriesContent() {
    const [queries, setQueries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const res = await fetch('/api/queries');
            if (res.ok) {
                const data = await res.json();
                setQueries(data);
            }
        } catch (error) {
            console.error('Failed to fetch queries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this query?')) return;

        setIsDeleting(id);
        try {
            const res = await fetch(`/api/queries/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setQueries(queries.filter(q => q._id !== id));
            } else {
                alert('Failed to delete query');
            }
        } catch (error) {
            console.error('Error deleting query:', error);
            alert('An error occurred while deleting');
        } finally {
            setIsDeleting(null);
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground transition-colors mr-2">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            Contact Queries
                        </h1>
                        <p className="text-sm text-muted-foreground ml-9">Manage user inquiries</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Service</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Message</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {queries.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                            No queries found.
                                        </td>
                                    </tr>
                                ) : (
                                    queries.map((query) => (
                                        <tr key={query._id} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-foreground">{query.name}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                <div>{query.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                <div>{query.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                                    {query.service || 'Not specified'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs">
                                                <p className="line-clamp-3">{query.message}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                                                {new Date(query.createdAt).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(query._id)}
                                                    disabled={isDeleting === query._id}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                                                    title="Delete Query"
                                                >
                                                    {isDeleting === query._id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function QueriesPage() {
    return (
        <AdminProtected>
            <QueriesContent />
        </AdminProtected>
    );
}
