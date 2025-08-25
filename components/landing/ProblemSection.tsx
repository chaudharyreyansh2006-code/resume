export function ProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-black">
          Tired of your resume getting lost in the pile?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-3 ">PDF resumes are boring</h3>
            <p className="text-gray-600 ">Your amazing experience gets buried in a generic document that looks like everyone else's.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-3 ">Email attachments get ignored</h3>
            <p className="text-gray-600 ">Recruiters receive hundreds of emails daily. Your resume PDF disappears into their inbox black hole.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">😴</div>
            <h3 className="text-xl font-semibold mb-3 ">No way to show personality</h3>
            <p className="text-gray-600 ">Static documents can't capture who you really are or what makes you unique.</p>
          </div>
        </div>
      </div>
    </section>
  );
}