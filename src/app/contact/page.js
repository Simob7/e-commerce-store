export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full p-3 border rounded-xl h-32 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="How can we help?"></textarea>
        </div>
        <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}
