import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  Eye, 
  Zap, 
  TestTube,
  MapPin,
  Camera,
  Send,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { WaterQualityReport } from '@shared/schema';

interface WaterQualityParameters {
  pH: number;
  temperature: number;
  dissolvedOxygen: number;
  turbidity: number;
  conductivity: number;
  totalDissolvedSolids: number;
  nitrate: number;
  phosphate: number;
  bacteria: number;
}

interface WaterQualityMonitorProps {
  onReportSubmit: (report: Partial<WaterQualityReport>) => void;
}

export default function WaterQualityMonitor({ onReportSubmit }: WaterQualityMonitorProps) {
  const { user, addGuestTokens } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, address: '' });
  const [parameters, setParameters] = useState<WaterQualityParameters>({
    pH: 7.0,
    temperature: 20,
    dissolvedOxygen: 8.0,
    turbidity: 5.0,
    conductivity: 500,
    totalDissolvedSolids: 300,
    nitrate: 5.0,
    phosphate: 0.5,
    bacteria: 100
  });
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const getQualityRating = (params: WaterQualityParameters): 'excellent' | 'good' | 'fair' | 'poor' | 'critical' => {
    let score = 0;
    
    // pH (0-14, optimal 6.5-8.5)
    if (params.pH >= 6.5 && params.pH <= 8.5) score += 20;
    else if (params.pH >= 6.0 && params.pH <= 9.0) score += 10;
    
    // Temperature (optimal 10-25°C)
    if (params.temperature >= 10 && params.temperature <= 25) score += 15;
    else if (params.temperature >= 5 && params.temperature <= 30) score += 8;
    
    // Dissolved Oxygen (optimal > 6 mg/L)
    if (params.dissolvedOxygen > 6) score += 20;
    else if (params.dissolvedOxygen > 4) score += 10;
    
    // Turbidity (optimal < 5 NTU)
    if (params.turbidity < 5) score += 15;
    else if (params.turbidity < 10) score += 8;
    
    // Nitrate (optimal < 10 mg/L)
    if (params.nitrate < 10) score += 15;
    else if (params.nitrate < 20) score += 8;
    
    // Phosphate (optimal < 0.1 mg/L)
    if (params.phosphate < 0.1) score += 15;
    else if (params.phosphate < 0.5) score += 8;

    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'fair';
    if (score >= 30) return 'poor';
    return 'critical';
  };

  const getQualityColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'fair': return <Info className="w-4 h-4" />;
      case 'poor': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const handleParameterChange = (param: keyof WaterQualityParameters, value: number) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  const handleLocationGet = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const qualityRating = getQualityRating(parameters);
      const report: Partial<WaterQualityReport> = {
        userId: user?.id || 0,
        location,
        parameters,
        qualityRating,
        notes,
        images,
        timestamp: new Date(),
        isVerified: false
      };

      await onReportSubmit(report);
      
      // Награждаем токенами за отчет
      const tokensEarned = qualityRating === 'excellent' ? 10 : 
                          qualityRating === 'good' ? 8 : 
                          qualityRating === 'fair' ? 5 : 
                          qualityRating === 'poor' ? 3 : 1;
      
      if (!user) {
        await addGuestTokens(tokensEarned, 'water_quality_report');
      }

      // Сброс формы
      setParameters({
        pH: 7.0,
        temperature: 20,
        dissolvedOxygen: 8.0,
        turbidity: 5.0,
        conductivity: 500,
        totalDissolvedSolids: 300,
        nitrate: 5.0,
        phosphate: 0.5,
        bacteria: 100
      });
      setNotes('');
      setImages([]);
      
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const qualityRating = getQualityRating(parameters);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Мониторинг качества воды
          </CardTitle>
          <CardDescription>
            Добавьте отчет о качестве воды в вашем районе
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Оценка качества */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {getQualityIcon(qualityRating)}
              <div>
                <p className="font-medium">Оценка качества</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  На основе введенных параметров
                </p>
              </div>
            </div>
            <Badge className={getQualityColor(qualityRating)}>
              {qualityRating === 'excellent' ? 'Отлично' :
               qualityRating === 'good' ? 'Хорошо' :
               qualityRating === 'fair' ? 'Удовлетворительно' :
               qualityRating === 'poor' ? 'Плохо' : 'Критично'}
            </Badge>
          </div>

          {/* Местоположение */}
          <div className="space-y-3">
            <Label>Местоположение</Label>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleLocationGet} className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Определить автоматически
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Широта"
                value={location.latitude}
                onChange={(e) => setLocation(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
              />
              <Input
                type="number"
                placeholder="Долгота"
                value={location.longitude}
                onChange={(e) => setLocation(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <Input
              placeholder="Адрес (опционально)"
              value={location.address}
              onChange={(e) => setLocation(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          {/* Параметры качества воды */}
          <div className="space-y-4">
            <Label>Параметры качества воды</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* pH */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <Label>pH</Label>
                  <Badge variant="outline">{parameters.pH.toFixed(1)}</Badge>
                </div>
                <Slider
                  value={[parameters.pH]}
                  onValueChange={([value]) => handleParameterChange('pH', value)}
                  max={14}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Оптимально: 6.5-8.5</p>
              </div>

              {/* Температура */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  <Label>Температура (°C)</Label>
                  <Badge variant="outline">{parameters.temperature}°C</Badge>
                </div>
                <Slider
                  value={[parameters.temperature]}
                  onValueChange={([value]) => handleParameterChange('temperature', value)}
                  max={40}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Оптимально: 10-25°C</p>
              </div>

              {/* Растворенный кислород */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <Label>Растворенный кислород (мг/л)</Label>
                  <Badge variant="outline">{parameters.dissolvedOxygen.toFixed(1)}</Badge>
                </div>
                <Slider
                  value={[parameters.dissolvedOxygen]}
                  onValueChange={([value]) => handleParameterChange('dissolvedOxygen', value)}
                  max={15}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Оптимально: > 6 мг/л</p>
              </div>

              {/* Мутность */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <Label>Мутность (NTU)</Label>
                  <Badge variant="outline">{parameters.turbidity.toFixed(1)}</Badge>
                </div>
                <Slider
                  value={[parameters.turbidity]}
                  onValueChange={([value]) => handleParameterChange('turbidity', value)}
                  max={50}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Оптимально: < 5 NTU</p>
              </div>

              {/* Нитраты */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4" />
                  <Label>Нитраты (мг/л)</Label>
                  <Badge variant="outline">{parameters.nitrate.toFixed(1)}</Badge>
                </div>
                <Slider
                  value={[parameters.nitrate]}
                  onValueChange={([value]) => handleParameterChange('nitrate', value)}
                  max={50}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Оптимально: < 10 мг/л</p>
              </div>

              {/* Фосфаты */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4" />
                  <Label>Фосфаты (мг/л)</Label>
                  <Badge variant="outline">{parameters.phosphate.toFixed(1)}</Badge>
                </div>
                <Slider
                  value={[parameters.phosphate]}
                  onValueChange={([value]) => handleParameterChange('phosphate', value)}
                  max={5}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Оптимально: < 0.1 мг/л</p>
              </div>
            </div>
          </div>

          {/* Дополнительные заметки */}
          <div className="space-y-2">
            <Label>Дополнительные заметки</Label>
            <Textarea
              placeholder="Опишите визуальные наблюдения, запах, цвет воды и другие особенности..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Фотографии */}
          <div className="space-y-2">
            <Label>Фотографии (опционально)</Label>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                <Camera className="w-4 h-4 mr-2" />
                Добавить фото
              </Button>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Фото ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Кнопка отправки */}
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Отправка...' : 'Отправить отчет'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

