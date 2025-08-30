import {Briefcase, GraduationCap, MapPin} from 'lucide-react';
import type {TimelineItem} from '../types';

type Props = {
    isDarkMode: boolean;
    title: string;
    subtitle: string;
    items: TimelineItem[];
};

export function Timeline({isDarkMode, title, subtitle, items}: Props) {
    return (
        <section id="timeline" aria-labelledby="timeline-heading" className={`min-h-screen py-20 ${isDarkMode ? 'bg-gray-900/60' : 'bg-gray-100/60'}`}>
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 id="timeline-heading" className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{title}</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
                    <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>
                </div>
                <div className="relative">
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                    <div className="space-y-12">
                        {
                            items.map((item, index) => (
                                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className="w-1/2 px-8">
                                        <div className={`p-6 rounded-lg border transition-all duration-300 hover:transform hover:scale-105 ${isDarkMode ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}`}>
                                            <div className="flex items-center mb-4">
                                                {
                                                    item.type === 'education' ? (
                                                        <GraduationCap className="text-blue-400 mr-3" size={24}/>
                                                    ) : (
                                                        <Briefcase className="text-purple-400 mr-3" size={24}/>
                                                    )
                                                }
                                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${item.type === 'education' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{item.year}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <div className="flex items-center mb-3">
                                                <span className="font-semibold text-blue-400">{item.institution}</span>
                                                <MapPin size={16} className={`ml-2 mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}/>
                                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.location}</span>
                                            </div>
                                            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                                            {
                                                Array.isArray((item as any).tech) && (item as any).tech.length > 0 && (
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                    {
                                                        ((item as any).tech as string[]).map((t) => (
                                                            <span key={t} className={`px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>{t}</span>
                                                        ))
                                                    }
                                                </div>
                                            )}
                                            {
                                                Array.isArray((item as any).skills) && (item as any).skills.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {
                                                            ((item as any).skills as string[]).map((s) => (
                                                                <span key={s} className={`px-2 py-1 text-xs rounded-full border ${isDarkMode ? 'border-blue-400 text-blue-300' : 'border-blue-600 text-blue-700'}`}>{s}</span>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-4 ${item.type === 'education' ? 'bg-blue-400 border-blue-200' : 'bg-purple-400 border-purple-200'} z-10`}></div>
                                    <div className="w-1/2"></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Timeline;
