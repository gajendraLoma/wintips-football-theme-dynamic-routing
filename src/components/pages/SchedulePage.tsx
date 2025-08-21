
// components/pages/SchedulePage.tsx
export default function SchedulePage({ data }: { data: any }) {

  return (    
  <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
        {data.title}
        </div>
      </div>
    </main>
    );
}