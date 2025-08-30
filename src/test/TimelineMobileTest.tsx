import React from 'react';
import Timeline from '../components/Timeline';

// Données de test pour la Timeline
const testTimelineItems = [
  {
    type: 'education' as const,
    year: '2023',
    title: 'Master en Développement Web',
    institution: 'Université de Paris',
    location: 'Paris, France',
    description: 'Formation complète en développement web moderne avec React, Node.js et bases de données.',
    tech: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    skills: ['Développement Full-Stack', 'Architecture Web', 'Gestion de Projet']
  },
  {
    type: 'work' as const,
    year: '2022-2023',
    title: 'Développeur Frontend Senior',
    institution: 'TechCorp',
    location: 'Lyon, France',
    description: 'Développement d\'applications web complexes avec React et TypeScript.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    skills: ['Développement React', 'Performance Web', 'Mentorat']
  },
  {
    type: 'education' as const,
    year: '2021',
    title: 'Formation en Cybersécurité',
    institution: 'Institut de Sécurité',
    location: 'Marseille, France',
    description: 'Formation intensive en sécurité informatique et bonnes pratiques.',
    tech: ['Kali Linux', 'Wireshark', 'Metasploit'],
    skills: ['Audit de Sécurité', 'Pentesting', 'Analyse de Vulnérabilités']
  }
];

export default function TimelineMobileTest() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          🧪 Test Timeline Mobile
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Instructions de test :
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>📱 <strong>Mode Mobile</strong> : Redimensionnez la fenêtre à moins de 768px de largeur</li>
            <li>🔄 <strong>Changement de thème</strong> : Testez le bouton de thème sombre/clair</li>
            <li>📏 <strong>Espacement</strong> : Vérifiez qu'il n'y a pas de décalages ou collisions</li>
            <li>🎨 <strong>Couleurs</strong> : Vérifiez que les couleurs s'adaptent au thème</li>
            <li>📱 <strong>Responsive</strong> : Testez sur différentes tailles d'écran</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Timeline Component (Test)
          </h2>
          <Timeline 
            isDarkMode={false}
            title="Mon Parcours"
            subtitle="Formation et expériences professionnelles"
            items={testTimelineItems}
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-blue-800 mb-2">✅ Corrections appliquées :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Suppression des bandes de debug rouges</li>
            <li>• Correction du positionnement absolu problématique</li>
            <li>• Espacement cohérent entre les éléments (space-y-8)</li>
            <li>• Utilisation de flexbox pour un alignement propre</li>
            <li>• Lignes de connexion positionnées correctement</li>
            <li>• Points de timeline avec icônes intégrées</li>
            <li>• Marges et paddings optimisés pour mobile</li>
            <li>• Suppression des z-index conflictuels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
