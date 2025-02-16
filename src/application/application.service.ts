import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaService';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApplicationService {
    constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService){}

    async accessApplication(id: number) {
        try {
            const application = await this.prisma.application.findUnique({
                where: { applicationId: Number(id) }
            });
            if (application) {
                const auth = 'Basic ' + Buffer.from('hackathon_36:hackathon_36_25').toString('base64');
                const headers = {
                    Accept: '*/*',
                    Authorization: auth,
                    'Content-Type': 'application/json',
                };
                const formattedApplication = {
                    extensions: {
                        attachment: null,
                        description: null
                    },
                    fields: {
                        num: application.num,
                        n_raion: application.n_raion,
                        fio: application.fio,
                        years: application.years,
                        info: application.info,
                        kontrakt: application.kontrakt,
                        nagrads: application.nagrads
                    },
                    geom: application.geom 
                };
                try {
                    const response = await this.httpService.post(`https://geois2.orb.ru/api/resource/8860/feature/`, formattedApplication, { headers }).toPromise();
                    this.prisma.application.delete({
                        where: {applicationId: id}
                    })
                    return response.data;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            } else {
                return { "message": "Заявки с таким id не найдено" };
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async deniedApplication(id: number){
        this.prisma.application.delete({
            where: {applicationId: Number(id)}
        })
    }
}
